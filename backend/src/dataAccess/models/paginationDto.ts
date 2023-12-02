export default class paginationDto{
    take!: number | null;
    skip!: number | null;  

    setTakeAndSkip(take : number | null, skip: number | null){
        this.take = take != null ? Number(take) : null;
        this.skip = skip != null ? Number(skip) : null;
    }
}