import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: "/comment",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["comment"]
    }),
    getComment: builder.query({
      query: (id: string) => ({
        url: `/comment/${id}`,
        method: "GET"
      }),
      providesTags: ["comment"]
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: "/comment/updateComment",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["comment"]
    }),
    deleteComment: builder.mutation({
      query: (id: string) => ({
        url: `/comment/${id}`,
        method: "DELETE",
        body: {}
      }),
      invalidatesTags: ["comment"]
    })
  })
});

export const {
  useCreateCommentMutation,
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation
} = commentApi;
