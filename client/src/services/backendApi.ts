/// <reference types="vite/client" />

import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const backendApi = createApi({
    reducerPath: "backendApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        createTrips: builder.mutation({
            query: (newTrip) => ({
                url: "plan-trip/create/",
                method: "POST",
                body: newTrip,
            })
        }),
    })
})

export const {useCreateTripsMutation} = backendApi;
