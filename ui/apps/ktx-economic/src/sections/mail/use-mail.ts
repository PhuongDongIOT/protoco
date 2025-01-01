import { Mail, mails } from "./data";
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface BearState {
  selected: Mail,
  setSelected: (by: Mail) => void
}

export const useMail = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        selected: mails[0],
        setSelected: (by) => set((state) => ({ selected: by })),
      }),
      {
        name: 'mail-storage',
      },
    ),
  ),
)