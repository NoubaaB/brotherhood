
import { useDashboard } from "@/stores/Dashboard.js";
import { useBill } from "@/stores/Bill.js";

export function establish() {
    let dashbaord = useDashboard();
    let bill = useBill();
    
    //start articles websockets
    Echo.private(`articles`)
        .listen("CreateArticleEvent", (event => {
        console.log("CreateArticleEvent", event)
        if (dashbaord.articles.find(article => article.id != event.article.id )) {
            dashbaord.articles.push(event.article);
        }
        })).listen("UpdateArticleEvent", (event => {
            console.log("UpdateArticleEvent", event)
            let article = dashbaord.articles.find(article => article.id == event.article.id);
            if (article) {
                article.date = event.article.date;
                article.description = event.article.description;
                article.price = event.article.price;
                article.is_private = event.article.is_private;
                article.star = event.article.star;
                article.user_id = event.article.user_id;
                article.product_id = event.article.product_id;
                article.total_id = event.article.total_id;
            }
        })).listen("DeleteArticleEvent", (event => {
            console.log("DeleteArticleEvent", event)
            dashbaord.articles = dashbaord.articles.filter(article => article.id != event.article.id);
        }));
    //end articles websockets

    //start bills websockets
    Echo.private(`bills`)
        .listen("CreateBillEvent", (event => {
        if (bill.bills.find(bill => bill.id != event.total.id)) {
            console.log("enter sandman")
            bill.bills.push(event.total);
        }
        event.articles.forEach(article_id => {
            let article = dashbaord.articles.find(__article => __article.id == article_id);
            if (article) {
                article.total_id = event.total.id
            }
        })
        })).listen("UpdateBillEvent", (event => {
            let _bill = bill.bills.find(bill => bill.id == event.total.id);
            if (_bill) {
                _bill.date = event.total.date;
                _bill.amount = event.total.amount;
                _bill.articles = event.total.articles;
                _bill.user_id = event.total.user_id;
            }
        })).listen("DeleteBillEvent", (event => {
            console.log("DeleteBillEvent", event);
            bill.bills = bill.bills.filter(bill => bill.id != event.total.id);
            if (event.articles) {
                event.articles.forEach(article_id => {
                    let article = dashbaord.articles.find(__article => __article.id == article_id);
                    if (article) {
                        article.total_id = event.total.id
                    }
                })
            }
        }));
    //end bills websockets
}