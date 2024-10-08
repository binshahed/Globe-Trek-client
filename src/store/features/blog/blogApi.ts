import { baseApi } from "../../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["blog"]
    }),

    myBlog: builder.query({
      query: () => ({
        url: "/blog/my-blog",
        method: "GET"
      }),
      providesTags: ["blog"]
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
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["blog"]
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET"
      }),
      providesTags: ["blog"]
    }),
    getAllBlog: builder.query({
      query: (query) => {
        const { searchTerm = "" } = query;
        return {
          url: `/blog?searchTerm=${searchTerm}`,
          method: "GET"
        };
      }
    })
  })
});

export const {
  useLikeBlogMutation,
  useMyBlogQuery,
  useDislikeBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useGetAllBlogQuery
} = blogApi;
