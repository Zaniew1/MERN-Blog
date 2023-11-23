export type PostType = {
    id?: string,
    _id?: string
    title: string,
    summary:string,
    content: string,
    mainPicture:string,
    contentCategory:string,
    creationDate:number,
    creator: UserType,
}

export type NextPostType = {
    index:string,
    id: string,
    title: string,
    summary:string,
    content: string,
    mainPicture:string,
    contentCategory:string,
    creationDate:number,
    creator: UserType,
}
export type UserType = {
    id?: string,
    _id?: string
    name: string,
    surname:string,
    email:string
    avatar?:string
}

export type EditUserType = {
    id: string,
    avatar: File | null
    name:string,
    surname: string
}
export type CreateUserType = {
    email:string,
    name:string,
    surname: string
    password:string,
    confirmPassword:string,
}
export const emptyUserType:UserType = {
    id: "",
    name: "",
    surname:"",
    email:""
}
export const emptyPostType:PostType = {
    id: "",
    title:"",
    summary:"",
    content:"",
    contentCategory:"",
    creationDate:0,
    mainPicture:"",
    creator: emptyUserType
}

export type AuthContextType = {
    loggedIn: boolean,
    setloggedIn: (logged: boolean) => void,
    userData: UserType,
    setUserData: (data: UserType) => void
  }
export type ContextPropsType = {
    children: React.ReactNode
  }

  
export type CreatePostType = {
    title: string, 
    summary: string,
    content: string,
    contentCategory:string,
    mainPicture:File | null
}
export type LoginDataType = {
    data: UserType,
    status:string,
    token: string
  }
 export type UIContextType = {
    mobileNav: boolean,
    setMobileNav: (logged: boolean) => void,
    showMorePostsIndex: number,
    setShowMorePostsIndex: (prevState: ((prev: number) => number)) => void,
  }
  export type ErrorContextType = {
    error: string,
    setError: (error: string) => void,
    success: string,
    setSuccess: (suceess: string) => void,
  }
