import { Graph } from "@agilysys-stay/adapter-starter";

export interface FolioGraphResponse {
    folioTransactionById: {
        id: string;
        type: string;
        postedDateTime: string;
        transactionDetails: {
            id: string;
            amount: string;
            description: string;
            account: {
                id: string;
                createTime: string;
                status: string;
                type: string;
            },
            folio: {
                id: string;
                isDefault: boolean;
                name: string;
            },
            postedBy: {
                username: string;
                firstName: string;
                lastName: string;
            },
            reservation: {
                id: string;
                confirmationCode: string;
                thirdPartyConfirmations: {
                    confirmationName: string;
                    confirmationNumber: string;
                }[],
                guestProfile: {
                    id: string;
                    firstName: string;
                    lastName: string;
                },
                checkInInfo: {
                    dateTime: string;
                    user: {
                        username: string;
                        firstName: string;
                        lastName: string;
                    };
                },
                loyaltyMemberships: {
                    id: string;
                    memberId: string;
                    name: string;
                }[];
            }
        }[]
    }
}

export const folioOutQuery =
    `query FolioTransactionById($folioTransactionByIdId: String!) {
        folioTransactionById(id: $folioTransactionByIdId) {
          id
          type
          postedDateTime
          transactionDetails {
           id
            amount
            description
            account {
              ... on CompanyAccount {
                id
                createTime
                status
                type
              }
              ... on GuestAccount {
                id
                createTime
                status
                type
              }
              ... on HouseAccount {
                id
                createTime
                name
                number
                status
                type
              }
              ... on GroupAccount {
                id
                createTime
                status
                type
                group {
                  id
                  arrivalDate
                  code
                  createTime
                }
              }
            }
            folio {
              id
              isDefault
              name
            }
            postedBy {
              username
              firstName
              lastName
            }
            reservation {
              id
              confirmationCode
              thirdPartyConfirmations {
                confirmationName
                confirmationNumber
              }
              guestProfile {
                id
                firstName
                lastName
              }
              checkInInfo {
                dateTime
                user {
                  username
                  firstName
                  lastName
                }
              }
              loyaltyMemberships {
                id
                memberId
                name
              }
            }
          }
        }
      }`;

export interface QueryInventoryInput {
        id: string;
}
      
export async function queryInventory(graph: Graph, input: QueryInventoryInput): Promise<FolioGraphResponse> {
    const variables = { "folioTransactionByIdId": input.id };
    return graph.query<FolioGraphResponse>(folioOutQuery, variables);
}