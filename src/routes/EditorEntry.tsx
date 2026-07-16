import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppStore } from "../store/useAppStore";

export default function EditorEntry() {
  const navigate = useNavigate();

  useEffect(() => {
    const activeId = useAppStore.getState().activeId;
    if (activeId) {
      navigate("/cheatsheet/" + activeId, { replace: true });
      return;
    }
    useAppStore.getState().newCheatsheet();
    const id = useAppStore.getState().activeId;
    if (id) navigate("/cheatsheet/" + id, { replace: true });
  }, [navigate]);

  return null;
}
