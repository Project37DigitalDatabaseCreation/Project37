
  > #### <span style="text-decoration: underline">Developer Checklist</span>
  > #### *Coding Standards:*
  >- [ ] 1: All source code files must have a file banner comment present and filled in.
  >- [ ] 2: All public classes must have a class banner comment present and filled in.
  >- [ ] 3: All public methods including constructors, except getter/setter methods, must have a method banner comment present and filled in.
  >- [ ] 4: Naming conventions are as follows:
   >>- [ ] a. Constants and Enums should be in all CAPS (example: PI)
   >>- [ ] b. Class names should be upper CamelCase, with the first letter uppercase (example: MyClass).
   >>- [ ] c. Variable, Parameter, and Method names should be in lower camelCase, with the first letter in
      lowercase (example: fooBar).
   >>- [ ] d. Non-public methods, variables, and constants should be prefixed by a leading underscore _.
  >- [ ] 5: All attributes must be private (class member variables, not constants).
  >- [ ] 6: All literal values, except loop indices starting at 0 or 1 must be declared as constants.
  >- [ ] 7: Classes should list methods and attributes in the following order, top-to-bottom:
   >>- [ ] a. Constants
   >>- [ ] b. Constructors
   >>- [ ] c. Public setter/getter methods in alphabetic order
   >>- [ ] d. Public non-getter/setter methods
   >>- [ ] e. Private methods
   >>- [ ] f. Private class member variables
  >- [ ] 8: All code should be consistent stylistically. This includes:
   >>- [ ] a. All {} should appear with the { at the end of a line and } on its own line
   >>- [ ] b. Indentation should be consistent.
   >>- [ ] c. All complex statements (if, else, switch, loops) must use explicit {} even if the body is a single line.
  > #### *Code Smells (CS):*
  >- [ ] 1: Duplicate code
  >- [ ] 2: Large Class
  >- [ ] 3: Switch statements
  >- [ ] 4: Feature Envy: A class that uses methods of other class extensively
  >- [ ] 5: Lazy class: A class that does too little.
  >- [ ] 6: Excessive use of literals: these should be coded as named constants.
  >- [ ] 7: Data clump: A group of variables are passed around together in various parts of the program. Should rather
   be a single object with these members that can be passed.
  >- [ ] 8: Method has too many parameters
  >- [ ] 9: Long method
  >- [ ] 10: Too long identifiers
  >- [ ] 11: Too short identifiers
  > #### *Functional Defects (FD):*
  >- [ ] 1: Any defects that hinder the program on working correctly
  
  > #### <span style="text-decoration: underline">Reviewer Checklist</span>
  >- [ ] 1: Developer completed the code review checklist
   >- [ ] 2: Developer stated why the code was needed
   >- [ ] 3: The code meets the functional requirements it's trying to fulfill
   >- [ ] 4: Unit tests are either present or the developer has stated an acceptable reason as to why they weren't included
   >- [ ] 5: Code is coherent and understandable
