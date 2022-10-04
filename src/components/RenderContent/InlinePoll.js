import { Container } from '@mui/material';
import React, { Component } from 'react';
import Poll from 'react-polls';
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { getCurrentLiveSite } from '../../lib/cobalt-cms/cobalt-helpers';

const fetcher = url => axios.get(url).then(res => res.data)

export default function InlinePoll({ jsonElement, cobaltData }) {

    const objId = cobaltData.object.data.id;
    const pollId = jsonElement.attributes["data-poll-id"]

    let data, error, mutate = null;
    if (!cobaltData.previewData) {
        ({ data, mutate, error } = useSWR('/api/' + getCurrentLiveSite(cobaltData) + '/polls/details/' + objId, fetcher, null));

        if (error) return <div>Failed to load</div>
        if (!data) return <div>Loading...</div>
    }
    
    let pollQuestion = null;
    let pollAnswers = null;

    if (jsonElement.elements) {
        pollQuestion = jsonElement.elements.find((el) => el.name === 'question')
        pollQuestion = (pollQuestion.elements ? pollQuestion.elements.filter((el) => el.type === "text").map((el) => el.text).join() : null)

        pollAnswers = jsonElement.elements.find((el) => el.name === 'answers')
        pollAnswers = (pollAnswers.elements ? pollAnswers.elements.map((answer) => {
            const answerText = (answer.elements ? answer.elements.filter((el) => el.type === 'text').map((el) => el.text).join() : null)
            const answerId = answer.attributes["data-answer-id"]
            let votes = 0
            try {
                votes = data.result.find((r) => r.pollId === pollId).answers.find((a) => a.id === answerId).votes
            } catch (e) { }
            return {
                option: answerText,
                votes: votes,
                answerId: answerId
            }
        }) : [])
    }

    const handleVote = async (voteAnswer) => {
        let response = null
        let voteId = null;
        voteId = pollAnswers.find((pa) => pa.option === voteAnswer).answerId
        try {
            const pollData = {
                nodeId: objId,
                pollId: pollId,
                answerId: voteId
            }

            const options = {
                method: 'POST',
                url: '/api/' + getCurrentLiveSite(cobaltData) + '/polls/vote',
                mode: 'no-cors',
                data: pollData,
                config: {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            };

            response = await axios.request(options)
            mutate();
        }
        catch (e) {
            console.log(e)
        }
    }

    let render = null;

    render = (
        <Container sx={{ my: 3 }} maxWidth="sm">
            <Poll question={pollQuestion} answers={pollAnswers} onVote={handleVote} noStorage={true} />
        </Container>
    )


    return render;

}