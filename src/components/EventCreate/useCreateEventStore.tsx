import create from 'zustand';
import { Category, CreateEventInput } from '../../generated/graphql';

const invalidGeoValue = -10000000;

const initialPayload = {
  title: '',
  dateFrom: '',
  address: '',
  category: Category.Other,
  longitude: invalidGeoValue,
  latitude: invalidGeoValue,
};

type CreateEventStore = {
  uploadedFile: File | null;
  setUploadedFile: (uploadedFile: File | null) => void;

  payload: CreateEventInput;
  updatePayload: (
    data: Partial<
      CreateEventInput & {
        uploadedFile?: File;
      }
    >
  ) => void;
  resetPayload: () => void;
  isLocationFilled: () => boolean;
};

export type CreateEventFormFields = CreateEventInput &
  Pick<CreateEventStore, 'uploadedFile'>;

export const useCreateEventStore = create<CreateEventStore>((set, get) => ({
  uploadedFile: null,
  setUploadedFile: (uploadedFile: File | null) => set(() => ({ uploadedFile })),

  payload: initialPayload,
  updatePayload: (data) =>
    set((state) => ({ payload: { ...state.payload, ...data } })),
  resetPayload: () =>
    set(() => ({
      payload: initialPayload,
    })),
  isLocationFilled: () =>
    get().payload.longitude != invalidGeoValue &&
    get().payload.latitude != invalidGeoValue &&
    get().payload.address !== undefined,
}));
