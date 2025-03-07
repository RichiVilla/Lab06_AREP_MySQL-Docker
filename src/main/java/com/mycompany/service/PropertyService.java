package com.mycompany.service;

import com.mycompany.model.Property;
import com.mycompany.repository.PropertyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {
    private static final Logger logger = LoggerFactory.getLogger(PropertyService.class);

    @Autowired
    private PropertyRepository propertyRepository;

    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        logger.info("Buscando propiedad con ID: {}", id);
        Optional<Property> property = propertyRepository.findById(id);
        if (property.isEmpty()) {
            logger.warn("No se encontró la propiedad con ID: {}", id);
        }
        return property;
    }

    public Property updateProperty(Long id, Property updatedProperty) {
        return propertyRepository.findById(id).map(property -> {
            property.setAddress(updatedProperty.getAddress());
            property.setPrice(updatedProperty.getPrice());
            property.setSize(updatedProperty.getSize());
            property.setDescription(updatedProperty.getDescription());
            return propertyRepository.save(property);
        }).orElseThrow(() -> new RuntimeException("Property not found with ID: " + id));
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}
