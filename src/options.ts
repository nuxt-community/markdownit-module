export interface ModuleOptions {
  injected?: boolean
  preset: string
  linkify: boolean
  breaks: boolean
  use: Array<String>
}

export interface ModuleLoader {
  loader: string
  options: ModuleOptions
}

export const moduleDefaults: ModuleOptions = {
  injected: true,
  preset: 'default',
  linkify: true,
  breaks: true,
  use: []
}
