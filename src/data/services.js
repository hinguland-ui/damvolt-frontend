// Services, tags and industries now come from the Laravel admin panel (see data/store.js).
import { services } from './store'

export { services, categories, industries } from './store'

export const getService = (slug) => services.find((s) => s.slug === slug)
