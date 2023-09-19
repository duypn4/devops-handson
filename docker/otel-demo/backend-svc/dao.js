class AnimalVote {

    constructor() {
        this.cat = 0;
        this.dog = 0;
    }

    setCat(vote) {
        this.cat = vote;
    }

    setDog(vote) {
        this.dog = vote;
    }
}

module.exports.AnimalVote = AnimalVote;