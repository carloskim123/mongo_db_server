type Book = {
    readonly _id: typeof ObjectId,
    title: string,
    author: string,
    rating: number,
    reviews: {
        name: string,
        body: string
        rating: number
    }
}

type DatabaseConnection = {
    collection: (arg0: string) => {
        (): any; new(): any; find: {
            (): {
                (): any; new(): any; sort: {
                    (arg0: { author: number; }): {
                        (): any; new(): any; forEach: {
                            (arg0: (book: Book
                                // init app & middleware
                            ) => number): Promise<any>; new(): any;
                        };
                    }; new(): any;
                };
            }; new(): any;
        }; findOne: { (arg0: { _id: any; }): Promise<Book>; new(): any; }; insertOne: { (arg0: Book): Promise<any>; new(): any; };
    };
}