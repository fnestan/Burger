import pdfKit from "pdfkit"
import fs from "fs"
import {Order} from "../../entities/Order";
import {getRepository, In} from "typeorm";
import {Product} from "../../entities/Product";

export class PdfGen {
    static async genPdf(data: Order) {
        const doc = new pdfKit();
        doc.pipe(fs.createWriteStream('Facture' + data.orderNum + '.pdf'));
        doc.text(new Date().toDateString());
        for (let i = 0; i < data.menuOrders.length; i++) {
            let result: Product;

            if (data.menuOrders[i].IsXl) {
                doc.text(data.menuOrders[i].menu.name + " XL");
            } else {
                doc.text(data.menuOrders[i].menu.name + " Normal");
            }
            doc.text(data.menuOrders[i].ingredientRemove);
            for (let j = 0; j < data.menuOrders[i].menu.productLines.length; j++) {
                const products = await getRepository(Product).find();
                result = products.find(p => {
                    return p.productLines.find(l => {
                        return l.id === data.menuOrders[i].menu.productLines[j].id
                    });
                });
                doc.text(result.name + ".............................");
            }
            doc.text("............................................................." + data.menuOrders[i].price.toString() + " €");
        }
        for (let i = 0; i < data.productLineOrders.length; i++) {
            let result: Product;
            doc.text(data.productLineOrders[i].ingredientRemove);
            const products = await getRepository(Product).find();
            result = products.find(p => {
                return p.productLines.find(l => {
                    return l.id === data.productLineOrders[i].productLine.id
                });
            });
            doc.text(result.name + "............................." + data.productLineOrders[i].productLine.desc_size);
            doc.text("............................................................" + data.productLineOrders[i].price + "  €");
        }

        doc.text("Total :....................." + data.price.toFixed(2).toString() + " €");
        doc.end();
    }

}
