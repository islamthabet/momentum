import { selectAuth } from '@/config/state/features/authSlice';
import { createFileRoute } from '@tanstack/react-router';
import { useSelector } from 'react-redux';
import PageTitle from '@/components/layout/PageTitle';
import { useForm } from 'react-hook-form';
import { InputFormController } from '@/components';
import z from 'zod';
import { FaCamera, FaEnvelope, FaUser } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axiosInstance from '@/config/axiosInstance';

export const Route = createFileRoute('/_home/profile/')({
  component: Profile,
});
// const userForm: ZodRawShape = {
//   firstname: '',
//   lastname: '',
//   username: '',
//   email: '',
//   gender: '',
//   birthday: new Date(),
// };

const schema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string().min(3),
  email: z.string().email(),
  gender: z.string(),
  birthday: z.date(),
});

type UserForm = z.infer<typeof schema>;

function Profile() {
  const { user } = useSelector(selectAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: user!,
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const changePhotoInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | FileList>(user?.profileImage as string);
  const [preivewdPhoto, setPreviewdPhoto] = useState(user?.profileImage);
  const onSubmit = (data: UserForm) => {
    console.log(data);
  };

  return (
    <div className="flex flex-grow flex-col gap-4 p-4">
      <PageTitle title="Profile" />
      <div className="flex gap-4">
        <div className="flex w-32 flex-col items-center justify-start gap-2">
          <div className="relative h-28 w-28 rounded-full  border shadow">
            <img src={preivewdPhoto} alt="profile image" className="h-full w-full rounded-full object-center" />
            <div
              onClick={() => changePhotoInputRef.current?.click()}
              className="absolute left-0 top-0 cursor-pointer rounded-full bg-red-50 p-2 text-indigo-800 shadow transition-colors duration-150 ease-in-out hover:bg-red-200"
            >
              <FaCamera />
              <input
                type="file"
                hidden
                ref={changePhotoInputRef}
                onChange={(e) => {
                  console.log(e);
                  if (e.target.files) {
                    setPhoto(e.target.files);
                    setPreviewdPhoto(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </div>
          </div>
          <AnimatePresence>
            {photo && photo !== user?.profileImage && (
              <motion.button
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.75, ease: 'linear' }}
                className="btn btn-outline btn-accent btn-sm text-xs"
                type="button"
                onClick={async () => {
                  const formData = new FormData();
                  console.log(photo);
                  for (const f of photo) {
                    formData.append('file', f);
                  }
                  // formData.append('file', photo[0]);
                  formData.append('user', user?.id + '');
                  const res = await axiosInstance.post('media/single', formData);
                  console.log({ res });
                }}
              >
                update
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid flex-grow grid-cols-2 content-start  gap-4 overflow-auto px-2 py-4"
        >
          <InputFormController
            register={register}
            name="firstname"
            errors={errors}
            placeholder="please type your first name"
          />

          <InputFormController
            register={register}
            name="lastname"
            errors={errors}
            placeholder="please type your last name"
          />

          <InputFormController
            register={register}
            name="username"
            errors={errors}
            icon={<FaUser />}
            placeholder="please type your user name"
          />

          <InputFormController
            register={register}
            name="email"
            errors={errors}
            icon={<FaEnvelope />}
            placeholder="please type your email"
          />

          <div className="col-span-2 grid grid-cols-3 gap-3">
            <input
              type="password"
              className="input input-bordered flex items-center gap-2"
              placeholder="Old password"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
            />
            <input
              type="password"
              className="input input-bordered flex items-center gap-2"
              placeholder="new Password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={async () => {
                const res = await axiosInstance.post('auth/changePassword', passwordData);
                console.log(res);
              }}
            >
              change password
            </button>
          </div>
          <button className="btn btn-neutral col-span-2">Update Your Profile</button>
        </form>
      </div>
    </div>
  );
}
