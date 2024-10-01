import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blog",
        method: "PATCH",
        body: data
      })
    }),
    likeBlog: builder.mutation({
      query: (data) => ({
        url: `/blog/like/${data.id}`,
        method: "PATCH"
      }),
      invalidatesTags: ["blog"]
    }),
    dislikeBlog: builder.mutation({
      query: (data) => ({
        url: `/blog/dislike/${data.id}`,
        method: "PATCH"
      }),
      invalidatesTags: ["blog"]
    })
  })
});

export const {
  useCreateBlogMutation,
  useLikeBlogMutation,
  useDislikeBlogMutation
} = blogApi;
