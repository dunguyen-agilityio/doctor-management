if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/dunguyen/.gradle/caches/8.10.2/transforms/2801946c0c1cb8512afdb6610c0b7f4a/transformed/hermes-android-0.76.8-release/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/dunguyen/.gradle/caches/8.10.2/transforms/2801946c0c1cb8512afdb6610c0b7f4a/transformed/hermes-android-0.76.8-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

