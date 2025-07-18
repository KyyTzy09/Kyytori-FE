"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/shadcn/dropdown-menu";
import { Edit, Eye, Trash } from "lucide-react";
import React from "react";
import AlertModal from "@/common/ui/modals/alert-modal";
import { defaultImage } from "@/common/constant/image";
import AvatarForm from "./avatar-form";
import useProfileForm from "@/common/composables/profile-form";

interface AvatarDropDownProps {
  children: React.ReactNode;
  image: string;
  setPreviewAction: (value: boolean) => void;
}

export default function AvatarDropDown({
  children,
  image,
  setPreviewAction,
}: AvatarDropDownProps) {
  const [isUpload, setIsUpload] = React.useState<boolean>(false); // State untuk menampilkan form update gambar
  const [isDelete, setIsDelete] = React.useState<boolean>(false); // State untuk menampilkan alert dialog// State untuk loading form

  const { DeleteAvatar, isLoading } = useProfileForm();

  const handleDelete = async () => {
    await DeleteAvatar({
      setIsDelete: setIsDelete,
    });
  };
  const items = [
    {
      name: "Lihat Gambar",
      Icon: Eye,
      disabled: image === defaultImage,
      Action: () => setPreviewAction(true),
    },
    {
      name: "Ganti Gambar",
      Icon: Edit,
      disabled: false,
      Action: () => setIsUpload(true),
    },
  ];

  return (
    <>
      <AvatarForm
        avatar={image}
        isOpen={isUpload}
        setIsOpenAction={setIsUpload}
      />
      <AlertModal
        title="Apakah anda yakin?"
        description="Tindakan ini tidak dapat dibatalkan"
        isOpen={isDelete}
        isLoading={isLoading}
        setIsOpenAction={setIsDelete}
        alertAction={handleDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black" align={"start"}>
          <DropdownMenuItem
            disabled={image === defaultImage}
            onClick={() => setIsDelete(true)}
            className="flex items-center justify-start gap-2 focus:bg-red-400 rounded-sm"
          >
            <Trash className="text-white w-4 h-4" />
            <p className="text-white font-semibold">Hapus Gambar</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {items.map((item) => {
            return (
              <DropdownMenuItem
                disabled={item.disabled}
                onClick={item.Action}
                key={item.name}
                className="flex items-center justify-start gap-2 focus:bg-red-400"
              >
                <item.Icon className="text-white w-4 h-4" />
                <p className="text-white font-semibold">{item.name}</p>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
