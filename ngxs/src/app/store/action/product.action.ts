import { Product } from "src/app/components/Models/product";

export class AddProduct{
    static readonly type='[Product] Add';
    constructor(public payload:Product){}
}

export class GetProduct{
    static readonly type='[Product] Get'; 
}

export class DeleteProduct{
    static readonly type='[Product] Delete';
    constructor(public id:number){}
}

export class UpdateProduct{
    static readonly type='[Product] Update';
    constructor(public payload:Product){}
}