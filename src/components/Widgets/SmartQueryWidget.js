export default function SmartQueryWidget({ cobaltData, semanticSearchData, gridContext }) {
    let render = null;
    if (semanticSearchData){
    render = (
        <div>This is a smart query:
            <ul>
                {semanticSearchData.map((el) => (
                    <li>{el.metadata.headline}</li>
                ))}
            </ul>
        </div>);
    }
    return render;
}


