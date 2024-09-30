import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query({
      query: () => ({
        url: "/auth/me"
      })
    }),
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: "/auth/me",
        method: "PATCH",
        body: profile
      })
    })
  })
});

export const { useUserQuery, useUpdateProfileMutation } = userApi;
