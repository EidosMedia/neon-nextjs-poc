export default function SmartQueryWidget({ cobaltData, semanticSearchData, gridContext }) {
    let render = null;
    const removeSimilars = (cobaltData.linkContext.linkData.parameters.removeSimilars === 'yes')
    const similarityThreshold = 0.95

    let list = semanticSearchData.matches
    if (removeSimilars) {
        list = list.filter((el, i) => {
            let include = true;
            for (let j = 0; j < i; j++) {
                if (semanticSearchData.similarities[i][j] > similarityThreshold) {
                    include = false
                }
            }
            return include
        })
    }

    if (list) {
        render = (
            <div>This is a smart query:
                <ul>
                    {list.map((el, i) => (
                        <li>{el.score} - {el.metadata.headline}</li>
                    ))}
                </ul>
            </div>);
    }
    return render;
}


