import { HitApi } from "./HitApi"
import { PopulateData } from "./FillData";
import { HtmlElementsData } from "./HtmlElementsId";
import { BASEURL } from "./globals";
export class findResult {
    data: any

    public find(find: string = "") {
        let elements = new HtmlElementsData();
        (document.getElementById(elements.thead) as HTMLTableRowElement).setAttribute(elements.sortAttributr , "");       
        (document.getElementById(elements.thead) as HTMLTableRowElement).setAttribute(elements.sortType , "");
        var uri = BASEURL+"/sorting?find=" + encodeURI(find) + "";
        new HitApi().HitGetApi(uri);

    }
}

