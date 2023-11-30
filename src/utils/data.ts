export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  address: string;
  position: string;
  committee: string;
  email: string;
  password: string;
  code: string;
  confirmpass: string
}


export interface ReportData {
  id: number;
  involved: String;
  incident: String;
  location: String;
  latlng: String;
  date: String;
}

export interface LocationData {
  location: string;
  latlng: string;
}

export interface ApiResponse {
  title: string;
  message: string;
}

export interface GetLocation {
  lat: number;
  lng: number;
  icon: string;
  label: string;
  content: string;
}


export interface CaseData {
  id: number;
  title: string;
  type: string;
  complainantfName: string;
  complainantmName: string;
  complainantlName: string;
  complainantAddress: string;
  complainantLatLng: string;
  complaintfName: string;
  complaintmName: string;
  complaintlName: string;
  complaintAddress: string;
  complaintLatLng: string;
  schedule: string;
  status: string;
  remark: string;
  location: string;
  locationLatLng: string;
  details: string;
}
