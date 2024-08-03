
import { useDashboard } from "@/stores/Dashboard.js";
import { useNotification } from "@/stores/Notification";
import { useAuth } from "@/stores/Auth";
import { useProduct } from "@/stores/Product";
import { initSocket } from "@/echo";

export function establish() {
    let dashboard = useDashboard();
    let notification = useNotification();
    let auth = useAuth();
    let product = useProduct();
    initSocket();
    //start articles websockets
    Echo.private(`articles`)
        .listen("CreateArticleEvent", (event => {
            console.log("CreateArticleEvent", event)
            if (dashboard.articles.find(article => article.id != event.article.id)) {
                dashboard.articles.push(event.article);
            }
        })).listen("UpdateArticleEvent", (event => {
            console.log("UpdateArticleEvent", event)
            let article = dashboard.articles.find(article => article.id == event.article.id);
            if (article) {
                article.date = event.article.date;
                article.description = event.article.description;
                article.price = event.article.price;
                article.is_private = event.article.is_private;
                article.star = event.article.star;
                article.user_id = event.article.user_id;
                article.product_id = event.article.product_id;
                article.bill_id = event.article.bill_id;
            }
        })).listen("DeleteArticleEvent", (event => {
            console.log("DeleteArticleEvent", event)
            dashboard.articles = dashboard.articles.filter(article => article.id != event.article.id);
        }));
    //end articles websockets

    //start bills websockets
    Echo.private(`bills`)
        .listen("CreateBillEvent", (event => {
            console.log("CreateBillEvent")
            if (!dashboard.bills.find(bill => bill.id == event.bill.id)) {
                dashboard.bills.push(event.bill);
            }
            event.articles.forEach(article_id => {
                let article = dashboard.articles.find(__article => __article.id == article_id);
                if (article) {
                    article.bill_id = event.bill.id
                }
            })
        })).listen("UpdateBillEvent", (event => {
            let _bill = dashboard.bills.find(bill => bill.id == event.bill.id);
            console.log("UpdateBillEvent")
            if (_bill) {
                _bill.date = event.bill.date;
                _bill.amount = event.bill.amount;
                _bill.articles = event.bill.articles;
                _bill.invoices = event.bill.invoices;
                _bill.user_id = event.bill.user_id;
            }
        })).listen("DeleteBillEvent", (event => {
            console.log("DeleteBillEvent", event);
            dashboard.bills = dashboard.bills.filter(bill => bill.id != event.bill.id);
            if (event.articles) {
                event.articles.forEach(article_id => {
                    let article = dashboard.articles.find(__article => __article.id == article_id);
                    if (article) {
                        article.bill_id = event.bill.id
                    }
                })
            }
        }));
    //end bills websockets

    //start notification websockets
    Echo.private(`notifications.${auth.getAuth.id}`)
        .listen("NotificationEvent", (event => {
            console.log("NotificationEvent",event)
            notification.notifications.push(event.notification);
            ++notification.unread;
            notification.addToSnackBar(event.notification);
        }));
    //end notification websockets

    //start product websockets
    Echo.private(`products`)
        .listen("CreateProductEvent", (event => {
            console.log("CreateProductEvent",event)
            product.collect.push(event.product);
        }));
    //end product websockets
}