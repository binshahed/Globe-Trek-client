import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query({
      query: () => ({
        url: "/auth/me"
      }),
      providesTags: ["user"]
    }),
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: "/auth/me",
        method: "PATCH",
        body: profile
      }),
      invalidatesTags: ["user"]
    }),
    followToggle: builder.mutation({
      query: (data) => ({
        url: `/auth/follow`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["blog", "user"]
    })
  })
});

export const {
  useUserQuery,
  useUpdateProfileMutation,
  useFollowToggleMutation
} = userApi;
