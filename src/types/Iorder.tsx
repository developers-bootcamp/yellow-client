
 interface IOrder{
    id: string,
    employee: IUsers,
    customer:IUsers,
    totalAmount:number ,
    orderItems : Array<IOrderItems>
    orderStatusId:string,
    companyId:ICompany,
    creditCardNumber:number,
    expiryOn:Date,
    cvc:string,
    notificationFlag:boolean,
    auditData:IAuditData
  }

  

  export interface IProductCategory {
    
    id: string ,
    name:string,
    desc:string,
    companiId :ICompany,
      auditData:IAuditData
}
   export interface IUsers {
    id: string,
    fullName: string,
    password: string,
    address:IAddress,
    roleId:IRoles,
    companyId:ICompany,
    AuditData:IAuditData
  }

  export interface IAddress {
    telephone: string,
    address: string,
    email:string
    
  }
 export  interface IRoles {
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
 export  interface IAuditData {
    createDate: Date,
    updateDte: Date
  }
  
export interface ICompany {
    id: string,
    name: string,
    auditData:IAuditData
    
  }
 export interface IOrderItems {
    productId: IProduct,
    amount: number,
    quantity:number
  } 
   export interface IProduct {
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
  interface IProductCatagory {
    id: string,
    name: string,
    desc:string,
    companyId:ICompany,
    auditData:IAuditData
  } 
  export type { IOrder

};