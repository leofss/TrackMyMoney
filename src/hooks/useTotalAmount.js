import{useCollection} from './useCollection'
import {useAuthContext} from './UseAuthContext'

export const useTotalAmount = (collection, sumTransactions, sumBalance) => {
    const {user} = useAuthContext();
    const {documents, error} = useCollection(collection, ["uid", "==", user.uid])   
    const UserSpendings =[]
    let sum = 0
    if(documents != null){
        documents.forEach(doc => {
            let spendings = parseFloat(doc.amount)
            UserSpendings.push(spendings)
        });
    }
    UserSpendings.forEach(item => {
        sum += item
    })

    const totalUpdated = sumTransactions - sumBalance;

  return {sum, error, totalUpdated}
}
