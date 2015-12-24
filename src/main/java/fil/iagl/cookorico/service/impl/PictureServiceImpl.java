package fil.iagl.cookorico.service.impl;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.util.Date;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import fil.iagl.cookorico.controller.util.Constant;
import fil.iagl.cookorico.dao.PictureDao;
import fil.iagl.cookorico.entity.CurrentUser;
import fil.iagl.cookorico.entity.Member;
import fil.iagl.cookorico.entity.Picture;
import fil.iagl.cookorico.exception.CookoricoException;
import fil.iagl.cookorico.service.PictureService;

@Service
public class PictureServiceImpl implements PictureService {

    @Autowired
    private PictureDao pictureDao;

    @Override
    public Picture savePicture(MultipartFile picture) {
    	
    	if (picture == null) {
            throw new CookoricoException("Paramètre non défini");
        }
	    
        if (picture.isEmpty()) {
            throw new CookoricoException("Le fichier est vide");
        }
        
        String imageExt = Constant.PICTURE_EXTENSION_VALIDE.stream().filter(ext -> picture.getOriginalFilename().endsWith(ext)).findAny().orElseThrow(() -> new CookoricoException("Format du fichier pas valide"));
        
        try {
        	// Prepare the file path
            CurrentUser currentUser = (CurrentUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	    Member creator = currentUser.getMember();
            
            String fileName = generateNewName();
            String folderPath = Constant.STATIC_RESSOURCE_LOCATION + File.separatorChar + Constant.UPLOADED_PICTURE_LOCATION + File.separatorChar + creator.getUsername();
            String absolutePath = Constant.STATIC_RESSOURCE_LOCATION + File.separatorChar + Constant.UPLOADED_PICTURE_LOCATION + File.separatorChar + creator.getUsername() + File.separatorChar + fileName + imageExt;
            
            // Create & write the file on the disk
            Path path = Paths.get(folderPath);
            Files.createDirectories(path);
            File file = new File(absolutePath);
            file.createNewFile();
            
            FileOutputStream output = new FileOutputStream(file);
            BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(picture.getBytes()));
            ImageIO.write(bufferedImage, imageExt.substring(1), output); // substring pour enlever le "." dans imageExt
            output.close();
            
            // prepare Picture entity to save
            Picture savedImg = new Picture();
            Date date = new Date();
    		
            savedImg.setFileName(fileName);
            savedImg.setCreationDate(new Timestamp(date.getTime()));
            savedImg.setDescription("Desc"); // TODO à automatiser
            savedImg.setDisabled(false);
            savedImg.setFilePath(absolutePath);
            savedImg.setMember(creator);
            savedImg.setTitle("Titre");  // TODO à automatiser
            
            // save entity to Database
            pictureDao.savePicture(savedImg);
            
            // return saved entity to front end
            return savedImg;
        } catch (Exception e) {
            throw new CookoricoException("Le fichier " + picture.getOriginalFilename() + " n'a pas pu être enregistré", e);
        }
    }

    @Override
    public Picture getPictureById(Integer idImage) {
        if (idImage == null) {
            throw new CookoricoException("L'id de l'image est null");
        }
        return pictureDao.getPictureById(idImage);
    }

    /*
     * Permet de générer un nom de fichier unique
     */
    private String generateNewName() {
        
	    String filename = "";
        long millis = System.currentTimeMillis();
        String datetime = DateFormat.getInstance().format(new Date());
        
        datetime = datetime.replace(" ", "");
        datetime = datetime.replace("/", "");
        datetime = datetime.replace(":", "");
        filename = datetime + "_" + millis;
        
        return filename;
    }
}