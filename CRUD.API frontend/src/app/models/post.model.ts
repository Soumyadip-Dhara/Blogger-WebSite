export interface Posts {
    result:       Post[];
    statusCode:   number;
    errorMessage: string;
}

export interface Post {
    id:   number;
    title: string;
    description: string;
    category: number;
    createdBy?: string,
    createdDate: Date,
    isPublished: boolean;
}

export interface AllPosts {
    result:       AllPost[];
    statusCode:   number;
    errorMessage: string;
}

export interface AllPost{
    id:   number;
    title: string;
    description: string;
    category: number;
    createdBy?: string,
    createdDate: Date,
    isPublished: boolean;
}

export interface AddPosts {
    result:       AddPost[];
    statusCode:   number;
    errorMessage: string;
}

export interface AddPost {
    //id:   number;
    title: string;
    description: string;
    category: number;
    createdBy?: string,
    createdDate: Date,
    isPublished: boolean;
}


export interface Blog {
    createdBy?: number;
    title: string;
    content: string;
  }