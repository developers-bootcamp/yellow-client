
 interface IOrder{
    id: string,
    employee: IUsers,
    customer:IUsers,
    totalAmount:number ,
    orderItems : Array<IOrderItems>
    OrderStatusId:string,
    companyId:ICompany,
    CreditCardNumber:number,
    expiryOn:Date,
    cvc:string,
    notificationFlag:boolean,
    auditData:IAuditData
  }

  
  interface IUsers {
    id: string,
    fullName: string,
    password: string,
    address:IAddress,
    roleId:IRoles,
    companyId:ICompany,
    AuditData:IAuditData

  }
  interface IAddress {
    telephone: string,
    address: string,
    email:string
    
  }
  interface IRoles {
    id: string,
    name: EName,
    desc: string,
    AuditData:IAuditData
  }
  enum EName {
    Value1 = 'Admin',
    Value2 = 'employee',
    Value3 = 'customer'
  }
  interface IAuditData {
    createDate: Date,
    updateDte: Date
  }
  
interface ICompany {
    id: string,
    name: string,
    auditData:IAuditData
    
  }
  interface IOrderItems {
    productId: IProduct,
    amount: number,
    quantity:number
  } 
  interface IProduct {
    id:string,
    name: string,
    desc: string,
    price:number,
    discount:EDiscount,
    categoryId:IProductCatagory,
    inventory:number,
    companyId:ICompany,
    auditData:IAuditData
  } 

  enum EDiscount {
    Value1 = 'Percentage',
    Value2 = 'FixedAmount'
  } 

 export interface IProductCatagory {
    id: string,
    name: string,
    desc:string,
    companyId:ICompany,
    auditData:IAuditData
  } 

  export type { IOrder
};