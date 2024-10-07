import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    user: builder.query({
      query: () => ({
        url: "/auth/me"
      }),
      providesTags: ["user", "blog", "payment"]
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
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/auth/users"
      }),
      providesTags: ["user"]
    }),
    changeRole: builder.mutation({
      query: (data) => ({
        url: "/auth/change-role",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["user"]
    })
  })
});

export const {
  useUserQuery,
  useUpdateProfileMutation,
  useFollowToggleMutation,
  useGetUsersQuery,
  useChangeRoleMutation
} = userApi;
