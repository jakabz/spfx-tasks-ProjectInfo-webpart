import { WebPartContext } from '@microsoft/sp-webpart-base';  
import { sp } from "@pnp/sp";  
import "@pnp/sp/webs";  
import "@pnp/sp/lists";  
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import { Web } from "@pnp/sp/webs";
import { IListItem } from '../models/IListItem';  
  
export class ListViewService { 
    
    public context:WebPartContext;
  
    public setup(cont: WebPartContext): void {  
        sp.setup({  
            spfxContext: cont
        });
        this.context = cont;
    }

    public async getCurrentUserGroups(): Promise<any[]> {
        return new Promise<any[]>(async (resolve, reject) => {
            try {
                sp.web.currentUser.groups().then((item:any[]) => {
                    resolve(item);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
        
    }

    public async getCurrentSiteItems(): Promise<IListItem[]> {  
        const web = Web(this.context.pageContext.site.absoluteUrl);
        return new Promise<IListItem[]>(async (resolve, reject) => {  
            try {  
                web.lists.getByTitle('Front Page Tiles').items.filter("Title eq '"+this.context.pageContext.web.title+"'").orderBy("Title", true).get().then((items) => {  
                    items.length > 0 ? resolve(items[0]) : resolve(items[0]);
                });  
            }  
            catch (error) {  
                console.log(error);  
            }  
        });  
    }

    public async updateItem(listItemId,data): Promise<Object> {  
        const web = Web(this.context.pageContext.site.absoluteUrl);
        return new Promise<Object>(async (resolve, reject) => {  
            try {
                web.lists.getByTitle("Front Page Tiles").items.getById(listItemId).update(data).then((response) => {  
                    resolve(response);
                });
            }  
            catch (error) {  
                console.log(error);  
            }  
        });  
    }
}  
  
const SPListViewService = new ListViewService();  
export default SPListViewService;