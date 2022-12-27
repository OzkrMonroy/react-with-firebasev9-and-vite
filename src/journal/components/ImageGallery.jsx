import { ImageList, ImageListItem } from "@mui/material";
import { useSelector } from "react-redux";

export const ImageGallery = () => {
  const { activeNote } = useSelector((state) => state.journal);
  const { imageUrls } = activeNote;
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
      {(imageUrls || []).map((url) => (
        <ImageListItem key={url}>
          <img src={url} srcSet={url} alt={url} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
