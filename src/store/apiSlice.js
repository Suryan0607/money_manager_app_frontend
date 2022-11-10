import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//const baseURI = 'http://localhost:8080';

const baseURI = 'https://money-manager-app-0.herokuapp.com';

export const apiSlice = createApi({
    baseQuery : fetchBaseQuery({ baseUrl : baseURI}),
    endpoints : builder => ({
        // get categories
        getCategories : builder.query({
            // get: 'http://localhost:8080/api/categories'
            query: () => '/api/categories',
            providesTags: ['categories']
        }),

        // get labels
        getLabels : builder.query({
            // get: 'http://localhost:8080/api/labels'
            query : () => '/api/labels',
            providesTags: ['transaction']
        }),

        // add new Transaction
        addTransaction : builder.mutation({
            query : (initialTransaction) => ({
                  // post: 'http://localhost:8080/api/transaction'
                url: '/api/transaction',
                method: "POST",
                body: initialTransaction
            }),
            invalidatesTags: ['transaction']
        }),

        // delete record
        deleteTransaction : builder.mutation({
            query : recordId => ({
                // delete: 'http://localhost:8080/api/transaction'
                url : '/api/transaction',
                method : "DELETE",
                body : recordId
            }),
            invalidatesTags: ['transaction']
        }),
        
        // signup user
        signupUser:builder.mutation({
            // get: 'http://localhost:8080/api/signup'
            query :(user) => ({
                url:'/api/signup',
                method:"POST",
                body: user
            }),
            invalidatesTags: ['user']

        }),

         // sign user 
        signinUser:builder.mutation({
            // get: 'http://localhost:8080/api/signin'
            query : (user) => ({
                url:'/api/signin',
                method:"POST",
                body: user
            }),
            invalidatesTags: ['user']

        }),

        // signout user
        signoutUser:builder.query({
            // get: 'http://localhost:8080/api/signout'
            query: () => '/api/signout',
            providesTags: ['user']          
        }),

        // delete user
        deleteUser : builder.mutation({
            query : id => ({
                // delete: 'http://localhost:8080/api/transaction'
                url : '/api/user',
                method : "DELETE",
                body : id
            }),
            invalidatesTags: ['user']
        }),

    })
})

export default apiSlice;