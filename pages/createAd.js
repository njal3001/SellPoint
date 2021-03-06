import { useState, useEffect } from "react";
import fire from "../config/fire-config";
import AppBar from "../components/header";
import { useRouter } from "next/router";
import FirebaseStorage from "../components/firebase_storage";
import AdForm from "../components/ad_form";

const CreateAd = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push("/users/login");
      } else {
        setUser(user);
        fire
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (!doc.data().permissions.advertiser) {
                router.push("/");
              } else {
                setLoading(false);
              }
            }
          });
      }
    });
  }, []);

  const handleSubmit = async (link, imageFile) => {
    setLoading(true);
    const storageImage = await FirebaseStorage.uploadImage(
      imageFile,
      "reklameBilder"
    );

    var document = await fire.firestore().collection("ads").add({
      userID: user.uid,
      link: link,
      imageRef: storageImage.ref,
      imageUrl: storageImage.url,
    });

    router.push("/");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return <AdForm handleSubmit={handleSubmit}></AdForm>;
};

export default CreateAd;
