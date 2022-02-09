import GenericWidget from "../Widgets/GenericWidget";
import LiveblogFragment from "./LiveblogFragment";
import StoryFragment from "./StoryFragment";

export default function GenericFragment({ cobaltData, gridContext }) {
    let render = null;
    if (cobaltData) {
        switch (cobaltData.object.data.sys.baseType) {
            case 'article':
                render = <StoryFragment cobaltData={cobaltData} gridContext={gridContext}/>;
                break;
            case 'widget':
                render = <GenericWidget cobaltData={cobaltData} gridContext={gridContext}/>;
                break;
            case 'liveblog':
                render = <LiveblogFragment cobaltData={cobaltData} gridContext={gridContext}/>;
                break;
        }
    }
    return render
}