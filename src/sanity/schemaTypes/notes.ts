const note = {
  name: "note",
  title: "Notes",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Enter the topic or title of the note",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Short summary of the note’s content",
    },
    {
      name: "file",
      title: "Upload File",
      type: "file",
      options: {
        storeOriginalFilename: true,
      },
      description: "Upload your note file (PDF, DOCX, or image)",
    },
    {
      name: "teacher",
      title: "Uploaded By",
      type: "string",
      description: "The name or email of the teacher who uploaded it",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
};

export default note;
