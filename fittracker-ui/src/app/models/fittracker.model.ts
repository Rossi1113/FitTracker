class FitTracker {
    _id:string;
    excercise: string;
    category: string;
    duration: string;
    calory: number;
    date: Date;

    constructor(
    ){
        this.excercise = ""
        this.category = ""
        this.duration = ""
        this.calory = 0
        this.date = new Date()
    }
}

export default FitTracker;