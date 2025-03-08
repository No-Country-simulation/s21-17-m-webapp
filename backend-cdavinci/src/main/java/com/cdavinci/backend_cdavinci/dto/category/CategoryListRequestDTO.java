package com.cdavinci.backend_cdavinci.dto.category;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryListRequestDTO {
    private String name;
    private String description;
    private List<CategoryListRequestDTO> subcategories;
}

