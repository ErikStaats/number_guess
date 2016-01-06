################################################################################
################################################################################
#
# Guess my number makefile.
#
################################################################################
################################################################################

#
# Includes.
#

include functions.mk


#
# Directory structure.
#
#   TOP                     Top of source tree.
#   BUILD_DIR               Build directory.
#   SRC_DIR                 Source directory.
#

TOP := $(PWD)
BUILD_DIR := $(TOP)/build
SRC_DIR := $(TOP)/src


#
# Default target.
#

.PHONY: all
all: number_guess


#
# Clean target.
#

.PHONY: clean
clean:
	rm -Rf build


#
# Install target.
#
#   This target will install Guess My Number on the Windjay Guess My Number
# server.
#

.PHONY: install
install:
	scp $(call list_files,$(BUILD_DIR)) \
            windjayd@windjay.com://home1/windjayd/public_html/guess


#
# Guess my number target.
#

.PHONY: number_guess
number_guess: $(BUILD_DIR)

$(BUILD_DIR):
	mkdir $(BUILD_DIR)


#
# Guess my number file targets.
#

# Copy all install source files to the build directory.
INSTALL_SRC_FILES := $(call list_files,$(SRC_DIR))
INSTALL_FILES := $(INSTALL_SRC_FILES:$(SRC_DIR)/%=$(BUILD_DIR)/%)

# Add install files to the guess my number target.
number_guess: $(INSTALL_FILES)

# Rule to copy an install source file to the build directory.
$(BUILD_DIR)% : $(SRC_DIR)/%
	cp $< $@


