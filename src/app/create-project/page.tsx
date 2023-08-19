import Modal from "@/components/Modal";

import { getCurrentUser } from "@/lib/session";
import ProjectForm from "@/src/components/projectForm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function CreateProject({}: Props) {
  const session = await getCurrentUser();
  if (!session) redirect("/");
  return (
    <Modal>
      <h3 className="modal-head-text">Create A New Project</h3>
      <ProjectForm type="create" session={session} />
    </Modal>
  );
}
