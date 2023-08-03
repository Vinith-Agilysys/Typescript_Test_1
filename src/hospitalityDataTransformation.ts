import * as guestBookings from "../src/interfaces/guestBookingsInterface";
import * as financialTrans from "../src/interfaces/financialTransactionsInterface";
import * as fs from 'fs';

var guestBookingsData : guestBookings.guestBookingsInterface[];
var financialTransactiondata : financialTrans.financialTransactionsInterface[];
var financialCharges;
var financialpostingdata;
var financialpostingindex;
var financialChargesindex;

export class hospitalityDataTransformation {
    constructor() {
    }
    readGuestBookings() {
        try {
            const jsonString = fs.readFileSync('./src/json/guestBookings.json', 'utf-8');
            guestBookingsData = JSON.parse(jsonString);
        } catch (err) {
            console.error(err);
        }
    }
    readFinancialTransactions() {
        try {
            const jsonString = fs.readFileSync('./src/json/financialTransactions.json', 'utf-8');
            financialTransactiondata =JSON.parse(jsonString);
        } catch (err) {
            console.error(err);
        }
    }
    generateFinancialCharges() {
        this.readGuestBookings();
        this.readFinancialTransactions();
        financialCharges = [];
        guestBookingsData.forEach((guestBooking) => {
            financialTransactiondata.forEach((transaction) => {
                if (guestBooking.guestName == transaction.guestName) {
                    if(this.guestExists(guestBooking.guestName)) {
                        financialCharges[financialChargesindex].amount += transaction.amount;
                        financialCharges[financialChargesindex].transactionType += ", " + transaction.transactionType;
                        return;
                    } else {
                    financialCharges.push({
                        guestName: guestBooking.guestName,
                        checkInDate: guestBooking.checkInDate,
                        checkOutDate: guestBooking.checkOutDate,
                        roomType: guestBooking.roomType,
                        totalAmount: guestBooking.totalAmount,
                        transactionType: transaction.transactionType,
                        amount: transaction.amount
                    });
                }
                }
            });
        });
        console.log("financialCharges");
        console.log(financialCharges);
        return financialCharges;
    }
    generateFinancialPostings(financialTransaction) {
        financialpostingdata = [];
        financialTransaction.forEach((financialCharge) => {
            if(this.transactionTypeExists(financialCharge.transactionType)) {
                financialpostingdata[financialpostingindex].amount += financialCharge.amount;
            } else {
                financialpostingdata.push({
                    transactionType: financialCharge.transactionType,
                    amount: financialCharge.amount
                });
            }
        });
        console.log("financialpostingdata");
        console.log(financialpostingdata);
        return financialpostingdata;
    }
    convertFinancialChargesToXML() {
        var financialCharges = this.generateFinancialCharges();
        console.log(financialCharges);
        return financialCharges.reduce((result, el) => {
        return result + `<financialCharges>
                        <guestName>"${el.guestName}"</guestName>
                        <checkInDate>"${el.checkInDate}"</checkInDate>
                        <checkOutDate>${el.checkOutDate}</checkOutDate>
                        <roomType>${el.roomType}</roomType>
                        <totalAmount>${el.totalAmount}</totalAmount>
                        <transactionType>${el.totalAmount}</transactionType>
                        <amount>${el.amount}</amount>
                        </financialCharges>\n`;
        }, '');
    }
    convertFinancialPostingsToXML() {
        var financialpostingdata = this.generateFinancialPostings(financialTransactiondata);
        console.log(financialpostingdata);
        return financialpostingdata.reduce((result, el) => {
        return result + `<financialPostings>
                        <transactionType>"${el.transactionType}"</transactionType>
                        <amount>"${el.amount}"</amount>
                        </financialPostings>\n`;
        }, '');
    }
    guestExists(guestName){
        financialChargesindex = 0;
        for(var i=0; i<financialCharges.length; i++){
            if(financialCharges[i].guestName == guestName) {
                financialChargesindex = i;
                return true;
            }
        }
    }
    transactionTypeExists(transactionType) {
        financialpostingindex = 0;
        for(var i=0; i<financialpostingdata.length; i++){
            if(financialpostingdata[i].transactionType == transactionType) {
                financialpostingindex = i;
                return true;
            }
        }
    }
}
let hospitalityDataTrans = new hospitalityDataTransformation();
try {
    fs.writeFileSync('./src/final/financialCharges.xml', hospitalityDataTrans.convertFinancialChargesToXML());
    fs.writeFileSync('./src/final/financialPostings.xml', hospitalityDataTrans.convertFinancialPostingsToXML());
    fs.writeFileSync('./src/final/financialCharges.json', JSON.stringify(hospitalityDataTrans.generateFinancialCharges()));
  } catch (err) {
    console.log(err);
}