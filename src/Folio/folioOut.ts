import {
    EventOutAsyncHttpRoute,
    HttpMethod,
    HttpRequest,
    OutboundEvent,
    RouteContext,
    RouteType
} from "@agilysys-stay/adapter-starter";
import { queryInventory, FolioGraphResponse } from "./folioGraph.js";
import { makeNotification } from "@agilysys-stay/marriott-symex";
import { log } from "@agilysys-stay/console-logger";

export interface FolioNotification {
    "folioId": string;
    "folioType": {
        "folioTypeCode": string;
        "folioTypeDesc": string;
    },
    "source": string;
    "confirmationIds": {
        "id": string;
        "provider": string;
        "value": string;
        "type": string;
        "description": string;
    }[],
    "customerId": string;
    "bonvoyMemberFlag": boolean;
    "checkInAgent": {
        "agentId": string;
        "firstName": string;
        "middleName": string;
        "lastName": string;
    },
    "propertyCode": string;
    "creationTS": string;
    "folioNumber": string;
    "folioStatus": string;
    "folioWindowId": string;
    "groupCode": string;
    "groupCreateTS": string;
    "invoiceFlag": boolean;
    "invoiceNumber": string;
    "balance": {
        "currencyCode": string;
        "value": string;
        "guestViewable": boolean;
        "numberOfDecimals": string;
    },
    "totalChargeAmt": {
        "currencyCode": string;
        "value": string;
        "guestViewable": boolean;
        "numberOfDecimals": string;
    },
    "totalCreditAmt": {
        "currencyCode": string;
        "value": string;
        "guestViewable": boolean;
        "numberOfDecimals": string;
    },
    "user": {},
    "resState": "Open",
    "resCloseDate": "2023-02-14T07:38:50Z",
    "profileInfo": {
        "fullName": string;
        "addressLine1": string;
        "addressLine2": string;
        "city": string;
        "state": string;
        "zip": string;
        "country": string;
        "iataNo": string;
        "contactName": string;
        "phoneNo": string;
        "emailAddress": string;
    },
    "folioCloseDate": string;
    "quoteNum": string;
    "folioTransactionDetails": {
        "folioId": string;
        "lineItemNo": string;
        "transType": string;
        "propertyCode": string;
        "folioType": {
            "folioTypeCode": string;
            "folioTypeDesc": string;
        },
        "confirmationIds": {
            "id": string;
            "provider": string;
            "value": string;
            "type": string;
            "description": string;
        }[],
        "groupCode": string;
        "resState": string;
        "resCloseDate": string;
        "transLinkId": string;
        "chargeCode": string;
        "roomNumber": string;
        "transactionTS": string;
        "businessTS": string;
        "transDesc": string;
        "transRefNo": string;
        "transactionAmt": {
            "currencyCode": string;
            "value": string;
            "guestViewable": boolean;
            "numberOfDecimals": string;
        },
        "transForexAmt": {
            "currencyCode": string;
            "value": string;
            "guestViewable": boolean;
            "numberOfDecimals": string;
        },
        "currExchngeRate": string;
        "transPostingNotes": string;
        "transPostingSrc": string;
        "summarizeFlag": boolean;
        "suppressionFlag": boolean;
        "transferFlag": boolean;
        "banquetChkFlag": boolean;
        "banquetChkRefNo": string;
        "posFlag": boolean;
        "postedBy": {},
        "folioTransPaymentDetails": {
            "pmtSeqNum": string;
            "lineItemNo": string;
            "pmtInstCode": string;
            "ccTypeCode": string;
            "paymentAmt": {
                "currencyCode": string;
                "value": string;
                "guestViewable": boolean;
                "numberOfDecimals": string;
            },
            "paymentTS": string;
            "cardHolderName": string;
            "cardAcctNo": string;
            "expireDate": string;
            "pmtTerminalId": string;
            "loyaltyRedeemTransId": string;
            "retailBankChkTS": string;
            "retailBankChkNo": string;
            "directBillNo": string;
            "acctReceivableId": string;
            "voucher": {
                "pmtSeqNo": string;
                "lineItemNo": string;
                "voucherType": string;
                "segmentIDRef": string;
                "paymentTypeCodeInfo": {
                    "pmtInstCode": string;
                    "pmtInstName": string;
                    "pmtInstDesc": string;
                },
                "remark": string;
                "privacy": {
                    "optInStatusInd": boolean;
                    "optInDate": string;
                    "optOutDate": string;
                },
                "payer": {
                    "payerId": string;
                    "payerTypeEnum": string;
                },
                "seriesCode": string;
                "effectiveDate": string;
                "expireDate": string;
                "billingNumber": string;
                "supplierIdentifier": string;
                "identifier": string;
                "valueType": string;
                "url": string;
                "system": string;
                "organization": string;
                "groupDaysApplyInd": boolean;
                "expireDateExclusiveInd": boolean;
                "electronicInd": boolean;
            },
            "folioPaymentAuthDetails": {
                "lineItemNo": string;
                "pmtSeqNo": string;
                "authSeqNo": string;
                "cardAuthTS": string;
                "authCode": string;
                "authRefNo": string;
                "authSrc": string;
                "authAmt": {
                    "currencyCode": string;
                    "value": string;
                    "guestViewable": boolean;
                    "numberOfDecimals": string;
                }
            }[],
            "paymentInstrument": {
                "pmtInstCode": string;
                "pmtInstName": string;
                "pmtInstDesc": string;
            },
            "creditCardType": {
                "ccTypeCode": string;
                "ccTypeName": string;
            }
        }[],
        "folioTransferDetails": {
            "transferTS": string;
            "trnsfrFromfolioId": string;
            "trnsfrFromLineItemNo": string;
            "trnsfrFromConfIds": {
                "id": string;
                "provider": string;
                "value": string;
                "type": string;
                "description": string;
            }[],
            "trnsfrFromPropCode": string;
            "trnsfrFromRoomNo": string;
            "trnsfrToFolioId": string;
            "trnsfrToLineItemNo": string;
            "trnsfrToConfIds": {
                "id": string;
                "provider": string;
                "value": string;
                "type": string;
                "description": string;
            }[],
            "trnsfrToPropCode": string;
            "trnsfrToRoomNo": string;
            "trnsfrByUser": {}
        }[],
        "revenueType": {
            "revenueTypeCode": string;
            "revenueTypeCodeDesc": string;
            "revenueTypeCodeParent": string;
        }
    }[]
}

export class FolioOut implements EventOutAsyncHttpRoute<FolioGraphResponse, FolioNotification> {
    id = "ara-folio-notification";
    type: RouteType.EVENT_OUT_ASYNC_HTTP = RouteType.EVENT_OUT_ASYNC_HTTP;
    eventRegistration = ["Folio"];
    transactionType = {
        primary: "ARA_FOLIO_NOTIFICATION"
    }

    async load(context: RouteContext, event: OutboundEvent): Promise<FolioGraphResponse> {
        const response = await queryInventory(context.graph, { id: event.entityId });
        log.verbose(`[${FolioOut.name}] Graph response: ${JSON.stringify(response)}`);
        return response;
    }
    async transform(context: RouteContext, input: FolioGraphResponse): Promise<FolioNotification> {
        const roomById = input.folioTransactionById;
        return {

        }
    }
    async package(context: RouteContext, model: FolioNotification): Promise<HttpRequest> {
        const settings = context.usage.settings;
        return {
            headers: {
                "pms-type-code": "STAYPMS",
                "pms-property-code": `${settings.MI_PROPERTY_CODE}`
            },
            method: HttpMethod.POST,
            url: `${settings.ARA_FOLIO_NOTIFICATION_HINT_URL}`,
            body: makeNotification("FolioNotification", model)
        };
    }
}