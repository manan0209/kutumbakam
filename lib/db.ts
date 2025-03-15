import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export type DisasterPortal = {
  id?: string;
  title: string;
  description: string;
  location: string;
  urgency: "low" | "medium" | "high";
  createdBy: string;
  createdAt: Timestamp | null;
  image?: string;
  status: "active" | "inactive" | "resolved";
};

export type ResourceNeed = {
  id?: string;
  portalId: string;
  title: string;
  description: string;
  category:
    | "medicine"
    | "food"
    | "shelter"
    | "clothing"
    | "water"
    | "transport"
    | "other";
  quantity: number;
  unit?: string;
  priority: "low" | "medium" | "high";
  status: "needed" | "partially_fulfilled" | "fulfilled";
  createdAt: Timestamp | null;
};

export type Volunteer = {
  id?: string;
  userId: string;
  portalId: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  availability: string;
  registeredAt: Timestamp | null;
};

export type Update = {
  id?: string;
  portalId: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: Timestamp | null;
};

// Disaster Portal functions
export async function createPortal(
  portalData: Omit<DisasterPortal, "id" | "createdAt">
) {
  const portalRef = collection(db, "disasterPortals");
  const newPortal = {
    ...portalData,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(portalRef, newPortal);
  return { id: docRef.id, ...newPortal };
}

export async function getPortal(portalId: string) {
  const portalRef = doc(db, "disasterPortals", portalId);
  const portalSnap = await getDoc(portalRef);

  if (portalSnap.exists()) {
    return { id: portalSnap.id, ...portalSnap.data() } as DisasterPortal;
  }

  return null;
}

export async function getActivePortals() {
  const portalsRef = collection(db, "disasterPortals");
  const q = query(
    portalsRef,
    where("status", "==", "active"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as DisasterPortal)
  );
}

export async function updatePortal(
  portalId: string,
  portalData: Partial<DisasterPortal>
) {
  const portalRef = doc(db, "disasterPortals", portalId);
  await updateDoc(portalRef, portalData);
  return { id: portalId, ...portalData };
}

// Resource Need functions
export async function createResourceNeed(
  resourceData: Omit<ResourceNeed, "id" | "createdAt">
) {
  const resourceRef = collection(db, "resourceNeeds");
  const newResource = {
    ...resourceData,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(resourceRef, newResource);
  return { id: docRef.id, ...newResource };
}

export async function getResourceNeeds(portalId: string) {
  const resourcesRef = collection(db, "resourceNeeds");
  const q = query(
    resourcesRef,
    where("portalId", "==", portalId),
    orderBy("priority", "desc"),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ResourceNeed)
  );
}

export async function getAllResourceNeeds() {
  const resourcesRef = collection(db, "resourceNeeds");
  const q = query(resourcesRef, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ResourceNeed)
  );
}

export async function updateResourceNeed(
  resourceId: string,
  resourceData: Partial<ResourceNeed>
) {
  const resourceRef = doc(db, "resourceNeeds", resourceId);
  await updateDoc(resourceRef, resourceData);
  return { id: resourceId, ...resourceData };
}

// Volunteer functions
export async function registerVolunteer(
  volunteerData: Omit<Volunteer, "id" | "registeredAt">
) {
  const volunteerRef = collection(db, "volunteers");
  const newVolunteer = {
    ...volunteerData,
    registeredAt: serverTimestamp(),
  };

  const docRef = await addDoc(volunteerRef, newVolunteer);
  return { id: docRef.id, ...newVolunteer } as Volunteer;
}

export async function getVolunteers(portalId: string) {
  const volunteersRef = collection(db, "volunteers");
  const q = query(
    volunteersRef,
    where("portalId", "==", portalId),
    orderBy("registeredAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Volunteer)
  );
}

// Update functions
export async function createUpdate(
  updateData: Omit<Update, "id" | "createdAt">
) {
  const updateRef = collection(db, "updates");
  const newUpdate = {
    ...updateData,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(updateRef, newUpdate);
  return { id: docRef.id, ...newUpdate };
}

export async function getUpdates(portalId: string) {
  const updatesRef = collection(db, "updates");
  const q = query(
    updatesRef,
    where("portalId", "==", portalId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Update)
  );
}
