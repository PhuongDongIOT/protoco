export interface LocationRequest {
  id: string
}

export interface EmptyRequest {}

export interface LocationResponse {
  id: string
  name: string
  latitude: number
  longitude: number
}

export interface LocationListResponse {
  locations: LocationResponse[]
}
