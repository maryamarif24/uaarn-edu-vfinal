import { type SchemaTypeDefinition } from 'sanity'
import course from './courses'
import note from './notes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [course, note],
}
