export default class paginationDto{
    take!: number | null;
    skip!: number | null;

    constructor(obj : Partial<paginationDto>){
        Object.assign(this, obj);
    }
}