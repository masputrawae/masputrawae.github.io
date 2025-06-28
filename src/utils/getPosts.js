// src/utils/posts.js
import { getCollection } from 'astro:content'

export async function getPosts(type = "All", featured = false, limit){
  const getAllPost = await getCollection("vault")
  let filterType;

  if(type === "All"){
    filterType = getAllPost
  } else if(type === "isNotProjects"){
    filterType = getAllPost.filter(i => i.data.type !== "Projects")
  } else if(type === "Projects"){
    filterType = getAllPost.filter(i => i.data.type === "Projects")
  }

  const filterFeatured = featured ? filterType.filter(i => i.data.featured) : filterType
  const limited = limit ? filterFeatured.slice(0, limit) : filterFeatured
  return limited
}

export function sorted(items){
  return items.sort((a, b)=>{
    const dateA = new Date(a.data.date).getTime()
    const dateB = new Date(b.data.date).getTime()
  }).sort((a, b) => (a.data.featured === b.data.featured ? 0 : a.data.featured ? -1 : 1))
}