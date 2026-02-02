export const CATEGORIES = [
  { id: 'moda', label: 'Moda' },
  { id: 'comercio', label: 'Comercio' },
  { id: 'tecnologia', label: 'Tecnologia' },
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'belleza', label: 'Belleza' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'salud', label: 'Salud' },
  { id: 'otros', label: 'Otros' },
]

export const ALL_CATEGORIES_OPTION = { id: 'all', label: 'Todas las categorias' }

const normalizeCategoryValue = (value?: string | null) => {
  if (!value) {
    return ''
  }

  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const formatCategoryLabel = (value?: string | null) => {
  if (!value) {
    return 'Otros'
  }

  const trimmed = value.toString().trim()
  if (!trimmed) {
    return 'Otros'
  }

  if (trimmed === trimmed.toLowerCase()) {
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
  }

  return trimmed
}

const slugifyCategory = (normalized: string) => normalized.replace(/\s+/g, '-')

const NORMALIZED_CATEGORIES = CATEGORIES.map((category) => ({
  ...category,
  normalizedLabel: normalizeCategoryValue(category.label),
}))

const CATEGORY_LOOKUP = new Map(
  NORMALIZED_CATEGORIES.flatMap((category) => [
    [category.id, category],
    [category.normalizedLabel, category],
  ])
)

export const resolveCategory = (value?: string | null) => {
  const normalized = normalizeCategoryValue(value)
  if (!normalized) {
    return CATEGORY_LOOKUP.get('otros') || CATEGORIES[CATEGORIES.length - 1]
  }

  const direct = CATEGORY_LOOKUP.get(normalized)
  if (direct) {
    return direct
  }

  const slug = slugifyCategory(normalized)
  const byId = CATEGORY_LOOKUP.get(slug)
  if (byId) {
    return byId
  }

  return {
    id: slug,
    label: formatCategoryLabel(value),
  }
}
