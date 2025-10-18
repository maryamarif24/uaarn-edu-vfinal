// /sanity/schemas/course.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Course Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      description: "For example: Udemy, Coursera, YouTube, etc.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Course Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Course Link",
      type: "url",
      description: "Direct link to the course details or notes",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
